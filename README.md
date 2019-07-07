# Game-of-Life
A game I created for my first project with General Assembly.


## Wire Frames

![WireFrame1] (./Assets/WireFrame1.png)

![WireFrame2] (./Assets/WireFrame2.png)

## User Story:

1.	User arrives at the web page, where the rules and empty game board are loaded.
2.	User selects squares on the game board by clicking them. Selecting a square changes the color.
3.	When start button is clicked, the game begins moving through generations: 4 per second for 25 seconds. For each generation (from Wikipedia - Conway's Game of Life)
a.	Any live cell with fewer than two live neighbors dies, as if by under population.
b.	Any live cell with two or three live neighbors lives on to the next generation.
c.	Any live cell with more than three live neighbors dies, as if by overpopulation.
d.	Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
4.	The number of generations and count of births and deaths are displayed at the bottom of the board.
5.	As long as the game board continues changing between generations, the game continues. if the user makes it to 100 generations they win and this is displayed in a win screen along with the number of births and deaths. If the game board stops changing between generations a loss screen is displayed. Both screen offer the option to play again, which resets the game board.