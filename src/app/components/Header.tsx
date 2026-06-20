import TopBar from "./Topbar";
import MainNavbar from "./MainNavbar";

/**
 * Header — drop this at the top of your layout.
 * Renders the 46px utility TopBar followed by the 90px MainNavbar.
 */
export default function Header() {
    return (
        <header>
            <TopBar />
            <MainNavbar />
        </header>
    );
}