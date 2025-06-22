type WrapHiddenProps = {
  hidden: boolean;
  children: React.ReactNode;
};

const WrapHidden = ({ hidden, children }: WrapHiddenProps) => {
  if (hidden) {
    return null;
  }

  return children;
};
export { WrapHidden };
