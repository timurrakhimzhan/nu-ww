import React from "react";
import styles from './ContentLayout.module.scss';
import clsx from "clsx";

type ContentLayoutProps = {
    children: React.ReactNode;
    disableInlineStartPadding?: boolean;
    disableInlineEndPadding?: boolean;
}

const ContentLayout: React.FC<ContentLayoutProps> = ({children, disableInlineEndPadding, disableInlineStartPadding}) => {
    return <div className={clsx(styles.content, disableInlineStartPadding && styles.disableInlineStartPadding, disableInlineEndPadding && styles.disableInlineEndPadding)}>
        {children}
    </div>
}

export default ContentLayout;