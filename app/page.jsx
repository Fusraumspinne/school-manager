import Image from "next/image";
import styles from "./page.module.css";
import Login from "@/components/Login";
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from './api/auth/[...nextauth]/route'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if(session) redirect("/dashboard")

  return (
    <div>
      <Login/>
    </div>
  );
}
