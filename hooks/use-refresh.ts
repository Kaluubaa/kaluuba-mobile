import { useCallback, useState } from 'react';

/**
 * Custom hook for managing pull-to-refresh functionality
 * @param refetchFunctions - Array of refetch functions to call on refresh
 * @returns Object containing refreshing state and onRefresh function
 */
export const useRefresh = (refetchFunctions: (() => Promise<any>)[]) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Execute all refetch functions in parallel
      await Promise.all(refetchFunctions.map(refetch => refetch()));
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  }, [refetchFunctions]);

  return {
    refreshing,
    onRefresh,
  };
};
