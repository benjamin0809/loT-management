import React from 'react';
export interface GlobalFooterProps {
  links?: Array<{
    key?: string;
    title: React.ReactNode;
    href: string;
    blankTarget?: boolean;
  }>;
  slogon?: string
  copyright?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default class GlobalFooter extends React.Component<GlobalFooterProps, any> {}
