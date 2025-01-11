import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import lessonsApi from '../../api/lessonsApi';

export const useGetSentencesQuery = (lesson: string) => {
    const {
        data: sentences,
        isError: isSentencesError,
        isLoading: isSentencesLoading,
        refetch: sentencesRefetch,
        fetchStatus: sentenceStatus,
    } = useQuery({
        queryKey: ['sentences', lesson],
        queryFn: () => {
            return lessonsApi.getAllSentences(lesson);
        },
        retry: false,
        refetchOnWindowFocus: false,
    });

    useMemo(() => {
        if (lesson !== 'stories_1') {
            return sentences?.sort(() => Math.random() - 0.5);
        }
        return sentences;
    }, [lesson, sentences]);

    return {
        sentences,
        isSentencesError,
        isSentencesLoading,
        sentencesRefetch,
        sentenceStatus,
    };
};
