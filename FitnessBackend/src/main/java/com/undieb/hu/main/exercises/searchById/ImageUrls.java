package com.undieb.hu.main.exercises.searchById;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ImageUrls(
        @JsonProperty("360p") String _360p,
        @JsonProperty("480p") String _480p,
        @JsonProperty("720p") String _720p,
        @JsonProperty("1080p") String _1080p
) {
}
