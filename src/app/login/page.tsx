"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {

    const [ clientId, setUserId ] = useState<string>("");

    const router = useRouter();

    const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => setUserId(event.target.value);

    const login = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        console.log("logging in with", clientId);

        if(clientId) router.replace(`/dashboard?clientId=CLIENT:${clientId}`);

    }, [clientId]);

    return <form onSubmit={login}>
        <div>
            <label>CLIENT:</label>
            <input type="text" onChange={handleUserIdChange} value={clientId}></input>
        </div>
        {/* Just a dummy login! Password is not required! */}
        <button type="submit">Login</button>
    </form>
}

export default Login;