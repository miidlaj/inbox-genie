import { getServerSession } from "next-auth";
import styles from "./page.module.css";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="header">
          {session && (
            <>
              <span>Session data from server: </span>
              {session?.user?.name} <br />
            </>
          )}

          {!session && (
            <>
              Not signed in!
              <br />
            </>
          )}
        </div>
      </div>
    </main>
  );
}