"use client";
import React, { useState } from "react";

export default function Draft() {
    const trigger = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            await fetch(`/api/test`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div>
                <button onClick={trigger}>Click me</button>
            </div>
        </>
    );
}
