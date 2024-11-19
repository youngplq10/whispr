import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import LoginRegisterUI from "@/app/components/LoginRegisterUI"
import { redirect } from "next/navigation"

const Home = async () => {
  const { isAuthenticated } = getKindeServerSession()
  const isLoggedIn = await isAuthenticated()

  if(isLoggedIn){
    redirect("/dashboard")
  }

  return(
    <>
      <div className="homepage">
        <LoginRegisterUI />
      </div>
    </>
  )
}
export default Home
