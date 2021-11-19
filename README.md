# SUDOKU SOLVER

#### Description: A website that allows users to play a game of sudoku and also input their own board to have it solved.

# Content:

This website has two main pages. The first is a sudoku solver and the second is a sudoku game.
In the sudoku solver, you can select a cell and input any number from 1 - 9 (Following the rules of sudoku). After you've finished entering all the hints, you can then click the solve button to have the puzzle solved. The website will warn you if the puzzle you've entered is unsolvable or invalid.

In the sudoku game page, you are given a random sudoku board from the database of sudoku boards to solve. You have to try to solve the sudoku following sudoku rules mentioned on the website. You have the option to give up and see the solution, check your answer after filling in the grid, play a new game, or clear all the values you have inputted. If you finish the puzzle, you can check your answer and see how long it took you to solve the board.

# Files:

about.html, create.html, and play.html obviously contain the code for their respective webpages. The two other html files, navbar.html and body.html, are parent files and allow some of the code to be re-used

script.js is where all the magic happens. It contains all the code from beautifying the website to the algorithm that solves the sudoku. In the beginning of the project, I had planned to code all the functionalities and algorithm for the website in python. However, I quickly found out that it would be difficult to have the python code connect and talk to the website. So I learned JavaScript and wrote all the code there.

sudoku.csv contains a list of 1 000 sudoku boards and their solutions, the website accesses this database when the user wants to play sudoku. The original database has 1 000 000, but I concluded that having that many boards is uneccessary and no one would play through them all. Plus, it would be slow to parse the file and choose from that many boards. So I reduced it to 1 000 boards.

I attempted to write my own algorithm to generate boards on the fly, but quickly found out it was beyond my skill-set and knowledge. There were far too many variables to consider when it came to generating a valid board with a unique solution. The algorithm I wrote was quite slow and inconsistent, sometimes it generated the board but sometimes it would end up running forever. In the end, I decided to go with Bryan Parks database of sudoku boards.

# Credit:

The sudoku database was provided by Kyubyong Park and can be found [_here_](https://www.kaggle.com/bryanpark/sudoku)

Icons were provided by [_Freepik_](https://www.freepik.com) from [_Flaticon_](https://www.flaticon.com) and [_Ionicon_](https://ionic.io/ionicons)
