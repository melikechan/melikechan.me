"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { MultiSelect } from "@/components/MultiSelect";
import { TypographyH1 } from "@/components/typography/headings";
import {
  TypographyLead,
  TypographyMuted,
} from "@/components/typography/paragraph";

const POSTS_PER_PAGE = 5;

export default function BlogList({ allPostsData, allTags }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("date-newest");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagFilterLogic, setTagFilterLogic] = useState("OR");
  const [currentPage, setCurrentPage] = useState(1);

  const [pageInput, setPageInput] = useState("1");

  const processedPosts = useMemo(() => {
    let filtered = allPostsData
      .filter((post) =>
        post.title?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((post) => {
        if (selectedTags.length === 0) return true;
        if (tagFilterLogic === "OR") {
          return selectedTags.some((tag) => post.tags?.includes(tag));
        } else {
          return selectedTags.every((tag) => post.tags?.includes(tag));
        }
      });

    const sorted = [...filtered].sort((a, b) => {
      switch (sortKey) {
        case "title-asc":
          return a.title?.localeCompare(b.title || "") || 0;
        case "title-desc":
          return b.title?.localeCompare(a.title || "") || 0;
        case "date-oldest":
          return new Date(a.date) - new Date(b.date);
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

    const totalPages = Math.ceil(sorted.length / POSTS_PER_PAGE);
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const paginatedPosts = sorted.slice(
      startIndex,
      startIndex + POSTS_PER_PAGE
    );

    return { paginatedPosts, totalPages };
  }, [
    allPostsData,
    searchTerm,
    selectedTags,
    tagFilterLogic,
    sortKey,
    currentPage,
  ]);

  useEffect(() => {
    setPageInput(currentPage.toString());
  }, [currentPage]);

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const handleTagsChange = (newTags) => {
    setSelectedTags(newTags);
    handleFilterChange();
  };

  const commitPageInput = () => {
    const newPage = parseInt(pageInput, 10);
    const totalPages = processedPosts.totalPages;

    if (isNaN(newPage) || newPage < 1) {
      setPageInput(currentPage.toString());
      return;
    }

    if (newPage > totalPages) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(newPage);
    }
  };

  const handlePageInputChange = (e) => {
    if (/^\d*$/.test(e.target.value)) {
      setPageInput(e.target.value);
    }
  };

  const handlePageInputKeyDown = (e) => {
    if (e.key === "Enter") {
      commitPageInput();
      e.target.blur();
    }
  };

  return (
    <main className="flex flex-col min-h-screen items-center gap-6 mt-2 mx-1 animate-fade-in">
      <div className="text-center">
        <TypographyH1>Blog</TypographyH1>
        <TypographyLead className="mt-2">
          Search, sort, and read my latest thoughts.
        </TypographyLead>
      </div>

      <div className="flex flex-col gap-4 w-full md:max-w-3xl lg:max-w-4xl">
        <Input
          type="text"
          placeholder="Search posts by title..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleFilterChange();
          }}
        />
        <MultiSelect
          allTags={allTags}
          selectedTags={selectedTags}
          onTagsChange={handleTagsChange}
        />
        {selectedTags.length > 1 && (
          <RadioGroup
            value={tagFilterLogic}
            onValueChange={setTagFilterLogic}
            className="flex items-center justify-center gap-4 bg-muted p-2 rounded-lg"
          >
            <Label className="font-medium">Match:</Label>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="OR" id="r-or" />
              <Label htmlFor="r-or" className="cursor-pointer">
                Any Tag (OR)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="AND" id="r-and" />
              <Label htmlFor="r-and" className="cursor-pointer">
                All Tags (AND)
              </Label>
            </div>
          </RadioGroup>
        )}
        <Select value={sortKey} onValueChange={setSortKey}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-newest">Sort by Date (Newest)</SelectItem>
            <SelectItem value="date-oldest">Sort by Date (Oldest)</SelectItem>
            <SelectItem value="title-asc">Sort by Title (A-Z)</SelectItem>
            <SelectItem value="title-desc">Sort by Title (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 w-full md:max-w-3xl lg:max-w-4xl">
        {processedPosts.paginatedPosts.length > 0 ? (
          processedPosts.paginatedPosts.map(
            ({ id, date, title, description, tags }) => (
              <Card key={id}>
                <CardHeader>
                  <CardTitle className="text-lg hover:text-primary">
                    <Link href={`/blog/${id}`}>{title || "Untitled Post"}</Link>
                  </CardTitle>
                  <CardDescription>{date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <TypographyMuted className="text-base">
                    {description}
                  </TypographyMuted>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} className="bg-primary/80">
                      {tag}
                    </Badge>
                  ))}
                </CardFooter>
              </Card>
            )
          )
        ) : (
          <TypographyLead className="text-center py-16">
            No posts found.
          </TypographyLead>
        )}
      </div>

      {processedPosts.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <span className="material-symbols-outlined">first_page</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </Button>

          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <span>Page</span>
            <Input
              type="text"
              value={pageInput}
              onChange={handlePageInputChange}
              onKeyDown={handlePageInputKeyDown}
              onBlur={commitPageInput}
              className="w-12 h-8 text-center"
              aria-label={`Current page, page ${currentPage} of ${processedPosts.totalPages}`}
            />
            <span>of {processedPosts.totalPages}</span>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === processedPosts.totalPages}
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(processedPosts.totalPages)}
            disabled={currentPage === processedPosts.totalPages}
          >
            <span className="material-symbols-outlined">last_page</span>
          </Button>
        </div>
      )}
    </main>
  );
}
