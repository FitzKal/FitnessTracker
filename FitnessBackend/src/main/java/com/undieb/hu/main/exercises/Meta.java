package com.undieb.hu.main.exercises;

public record Meta(
        int total,
        boolean hasNextPage,
        boolean hasPreviousPage,
        String nextCursor,
        String previousCursor
) {
}
