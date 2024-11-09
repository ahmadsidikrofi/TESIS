'use client'
import { usePathname } from "next/navigation"
import Sidebar from "./SideBar"
import { ThemeProvider } from "@/components/ui/theme-providers"
import { ApiProvider } from "@/context/ApiProvider"
import { Toaster } from "@/components/ui/toaster"

const SideBarWrapper = ({ makeChildren }) => {
    const pathname = usePathname()
    const excludeSidebar = ['/auth/callback']
    const showSidebar = !excludeSidebar.includes(pathname)
    return (
        <body className={`${showSidebar ? 'flex' : null}`}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                <ApiProvider>
                    {showSidebar && <Sidebar />}
                    <main className="mx-10">{makeChildren}</main>
                    <Toaster />
                </ApiProvider>
            </ThemeProvider>
        </body>
    )
}
export default SideBarWrapper