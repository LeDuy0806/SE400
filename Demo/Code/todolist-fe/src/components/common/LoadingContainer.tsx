import { PropsWithChildren } from 'react';
import LoadingPageBanner from './LoadingPageBanner';

type LoadingContainerProps = PropsWithChildren & {
  isLoading: boolean;
  size?: 'small' | 'default' | 'large';
};

export default function LoadingContainer({ children, isLoading, size = 'large' }: LoadingContainerProps) {
  return <>{isLoading ? <LoadingPageBanner disabledFullScreen size={size} /> : children}</>;
}
