import { Route, Routes } from "react-router-dom";
import Reception from "./pages/Reception/Reception";
import Floor from "./pages/Floor/Floor";
import PrivateRoute from "./utils/PrivateRoute";
import Layout from "./components/Layout/Layout";
import Forbidden from "./pages/Forbidden/Forbidden";

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<Reception />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route
            path="/floor/:index"
            element={<PrivateRoute component={<Floor />} />}
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
flowchart TD
    %% Login / Registration
    subgraph Login_Registration
        A[Client: 'login' (username)]
        B[Server: בדיקת DB]
        C{משתמש קיים?}
        D[Server: 'loginSuccess']
        E[Server: 'loginFailed']
        F[Client: בוחר לשלוח 'register']
        G[Server: רושם משתמש ומחזיר 'loginSuccess']
        A --> B
        B --> C
        C -- Yes --> D
        C -- No --> E
        E --> F
        F --> G
    end

    %% Game Invitation
    subgraph Game_Invitation
        H[Client: מציג רשימת משתמשים]
        I[Client: שולח 'invite' עם הגדרות משחק (boardSize, startingTurn)]
        J[Server: מאמת את ההזמנה ושולח 'inviteReceived' למוזמן]
        K[Client (Invitee): שולח 'inviteResponse' (accepted/rejected)]
        L{הזמנה אושרה?}
        M[Server: יוצר חדר, מאתחל מצב משחק ב-DB]
        N[Server: שולח 'gameStart' לכל המשתתפים]
        O[Server: שולח 'inviteRejected' למזמין]
        H --> I
        I --> J
        J --> K
        K --> L
        L -- Yes --> M
        M --> N
        L -- No --> O
    end

    %% Gameplay
    subgraph Gameplay
        P[Server: שולח 'yourTurn' עם טיימר (30 שניות)]
        Q[Client: שולח 'move' עם פרטי המהלך]
        R[Server: בודק את המהלך, מעדכן את מצב המשחק ב-DB]
        S[Server: בודק ניצחון/תיקו]
        T[Server: משדר 'moveMade' עם הלוח המעודכן ותור הבא]
        P --> Q
        Q --> R
        R --> S
        S --> T
    end

    %% Disconnection / Reconnect
    subgraph Disconnection_Reconnect
        U[Client: מתנתק]
        V[Server: מסמן את המשתמש כמנותק, מתחיל טיימר 30 שניות]
        W[Server: שולח 'playerDisconnected' לשחקן השני]
        X[Client: שולח 'reconnect' לפני תום 30 שניות]
        Y[Server: מאמת את החיבור מחדש ושולח 'reconnectSuccess' עם מצב המשחק הנוכחי]
        Z[טיימר נגמר]
        AA[Server: מכריז 'gameOver' - שחקן השני מנצח]
        U --> V
        V --> W
        V -- "reconnect" --> X
        X --> Y
        V -- "timeout" --> Z
        Z --> AA
    end

    %% Rematch / End
    subgraph Rematch_End
        AB[Client: שולח 'playAgain']
        AC[Server: בודק אם שני המשתתפים מעוניינים, מאפס מצב משחק]
        AD[Server: שולח 'gameStart' למשחק חדש]
        T --> AB
        AB --> AC
        AC --> AD
    end
