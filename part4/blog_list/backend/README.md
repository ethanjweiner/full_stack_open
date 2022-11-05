# Blog List

## REQUIREMENTS

- Users store blogs of interest
- Users can like blogs
- Blogs display title, author, url, & # of likes
- Blogs stored in MongoDB
- Proper module separation

## SMALL PROBLEMS

### Most Blogs

#### Problem

- Input: list of `blogs`:
- Object containing the `author` & # of `blogs` of the author w/ the most blogs
- If multiple authors are top bloggers, return any one of them

#### Ideas

- Create a tally w/ counts for each author, return author w/ max tally
- Sort + find longest consecutive sequence

#### Data Structures

- Intermediate: Tally object for storing the counts of each other

#### Algorithm

Given a list of `blogs`:
- Create a tally of `authorBlogCounts`
- Return an author/count object of author w/ most blogs

##### Author blog counts

- Initialize an empty tally of `authorBlogCounts`
- Iterate over each `blog` in `blogs`
  - Index into the `authorBlogCounts` at the current `blog.author`
  - If there is already an entry -> increment by 1
  - Otherwise, increment entry to 0
- Return `authorBlogCounts`

##### Return max object

- Initialize a `maxBlogCount` to the first entry
- Iterate over the entries in the `authorBlogCounts`
- Continually replace a `maxBlogCount` when a new max comes up
- Return the `maxBlogCount`

## TESTING REQUIREMENTS

- Conditionally set environments w/ scripts X
- Create a separate database + configure
- Implement tests themselves in a separate file
  - Use `supertest` to wrap application
  - Test that correct amount of blog posts are returned
  - Test that blog posts are in the JSON format

## DATABASE REQUIREMENTS

- One user -> many blogs
  - Each user should reference any array of blogs
  - Each blog can reference a user
- Upon blog creation, a user should bee selected as the creator