import { Link as BaseLink } from 'react-router-dom';
import React from 'react';
const Link = React.forwardRef(({ onClick, className, to, children, ...props }, ref) => (<BaseLink onClick={e => {
    if (performance.mark) {
        performance.clearMarks();
        performance.mark(`navigate-${to}`);
    }
    if (onClick)
        onClick(e);
}} className={className} to={to} {...props}>
      {children}
    </BaseLink>));
// exporting like this so it's just replace react-router-dom w/ thisFilePath
export { Link };
