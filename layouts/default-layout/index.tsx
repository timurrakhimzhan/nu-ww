import React, {useState} from "react";

import styles from './DefaultLayout.module.scss'
import Header from "../../components/header";
import MenuDrawer from "../../components/menu-drawer";

type DefaultLayoutProps = {
    children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({children}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return <div className={styles.layout}>
        <Header onMenuIconClick={() => setIsMenuOpen(true)} />
        <MenuDrawer isOpen={isMenuOpen} onCLose={() => setIsMenuOpen(false)} />
        <main className={styles.content}>
            {children}
        </main>

    </div>
}

export default DefaultLayout;