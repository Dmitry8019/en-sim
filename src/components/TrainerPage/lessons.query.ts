import { useQuery } from '@tanstack/react-query';

import lessonsApi from '../../api/lessonsApi';

export const useGetLessonsQuery = (level: string) => {
    const {
        data: lessons,
        isError: isLessonsError,
        isLoading: isLessonsLoading,
    } = useQuery({
        queryKey: ['lessons', level],
        queryFn: () => {
            return lessonsApi.getAllLessons(level);
        },
        retry: false,
        refetchOnWindowFocus: false,
    });

    return {
        lessons,
        isLessonsError,
        isLessonsLoading,
    };
};
