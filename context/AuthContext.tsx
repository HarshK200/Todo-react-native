import { RefreshTokenResponse, SigninResponse, User } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";
import * as SecureStore from "expo-secure-store";

// User means logged in, null means invalid login and undefined means in-the-middle of fetching user
interface AuthContext {
  user?: User | null;
  signIn: (
    username: string,
    password: string,
  ) => Promise<{
    user: User;
    accessToken: string;
    refreshToken: string;
  } | null>;
  signOut: () => Promise<void>;
}
const AuthContext = createContext<AuthContext | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>();

  // the api request to the server. If sccuessful returns the user, accessToken, refreshToken
  // and returns null
  const signIn = async (username: string, password: string) => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
          expiresInMins: 30, // optional, defaults to 60
        }),
      });

      const result = (await response.json()) as SigninResponse;
      const user: User = {
        id: result.id,
        username: result.username,
        email: result.email,
        firstName: result.firstName,
        lastName: result.lastName,
        gender: result.gender,
        image: result.image,
      };

      setUser(user);

      return {
        user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      };
    } catch (e) {
      console.log("Error during signin: ", e);

      setUser(null);

      return null;
    }
  };

  // call the api server logout route to get rid of the accessToken
  const signOut = async () => {
    // BUG: for a real backend make sure do a logout request to api i.e. going to  delete
    // the refreshToken from the db
    setUser(null);
  };

  // TODO: make a request to dummyjsonapi/auth/me or /verify with the accessToken and refreshToken (From expo-secure-store)
  // to check if the user jwtTokens are still valid and if they are then login the user i.e. set the User to the response
  // Also if accessToken is expried try to get it refreshed using the refreshToken
  const handleAuth = async () => {
    try {
      const response = await fetch("https://dummyjson.com/user/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync("accessToken")}`,
        },
      });

      if (response.status === 200) {
        const resultUser = (await response.json()) as User;
        setUser(resultUser);
        console.log(
          "successfully validated accessToken auth user is: ",
          resultUser,
        );
        return;
      }

      if (response.status === 401) {
        console.log(
          "Exipred accessToken attempting to refresh using refreshToken",
        );
        const response = await fetch("https://dummyjson.com/auth/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            refreshToken: await SecureStore.getItemAsync("refreshToken"),
            expiresInMins: 30, // optional (FOR ACCESS TOKEN), defaults to 60
          }),
        });

        if (response.status === 200) {
          const result = (await response.json()) as RefreshTokenResponse;
          await SecureStore.setItemAsync("accessToken", result.accessToken);
          await SecureStore.setItemAsync("refreshToken", result.refreshToken);
          handleAuth();
        } else {
          console.log("in useAuth() invalid or expired jwt tokens");
          setUser(null);
        }
      }
    } catch (e) {
      setUser(null);
      throw new Error("in useAuth() cannot validate user tokens");
    }
  };

  if (!user) {
    handleAuth();
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "Auth context is undefined. useAuth must be used inside a AuthProvider",
    );
  }

  return context;
};

export { AuthProvider, useAuth };
