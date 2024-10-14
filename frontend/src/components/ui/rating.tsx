"use client";

import * as React from "react";
import { FaStar } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface StarProps {
  rating?: number;
  color?: "amber" | "slate" | "red" | "green";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onRatingChange?: (rating: number) => void;
  viewOnly?: boolean;
}

const star = React.forwardRef<HTMLDivElement, StarProps>(
  (
    {
      rating = 1,
      color = "amber",
      size = "md",
      disabled = false,
      onRatingChange,
      viewOnly = false,
    },
    ref
  ) => {
    const starColor = {
      amber: "text-amber-500",
      slate: "text-muted-foreground",
      red: "text-red-500",
      green: "text-emerald-500",
    };

    const starSize = {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
    };

    const StarSVG = ({ filled }: { filled: boolean }) => (
      <FaStar
        className={cn(
          "shrink-0",
          filled ? starColor[color] : "text-border",
          starSize[size]
        )}
        fill="currentColor"
      />
    );

    const handleClick = (newRating: number) => {
      if (!disabled && onRatingChange) {
        onRatingChange(newRating);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center space-x-1",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        )}
      >
        {[1, 2, 3, 4, 5].map((starValue) => (
          <button
            key={starValue}
            className="appearance-none"
            type="button"
            aria-label={`Star ${starValue} out of 5`}
            onClick={() => handleClick(starValue)}
            disabled={viewOnly || disabled}
          >
            <StarSVG filled={starValue <= rating} />
          </button>
        ))}
      </div>
    );
  }
);

star.displayName = "StarRating";

export default star;
