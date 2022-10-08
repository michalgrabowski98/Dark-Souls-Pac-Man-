document.addEventListener("DOMContentLoaded", ()=>{
    const grid = document.querySelector(".grid")
    const scoreDisplay = document.getElementById("score")
    const width = 28
    const audio = document.querySelector('audio')
    const button = document.querySelector("button")
    let score = 0
    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]

    const squares = []

  // Legend
    // pac dot - 0
    // wall -  1
    // ghost-lair - 2
    // power-pellet - 3
    // empty space - 4


    function createBoard() {
        for (let i=0; i < layout.length; i++){
            const square = document.createElement('div')
            grid.appendChild(square)
            squares.push(square)

            if (layout[i] === 0) {
                squares[i].classList.add('pac-dot')
            } else if (layout[i] === 1) {
                squares[i].classList.add('wall')
            } else if (layout[i] === 2) {
                squares[i].classList.add('ghost-lair')
            } else if (layout[i] === 3) {
                squares[i].classList.add('power-pellet')
            }
        }
    }
    createBoard()
    //starting position of pac-man
    let pacmanCurrentIndex = 490
    squares[pacmanCurrentIndex].classList.add('pac-man')

    //audio prop.
    audio.volume = 0.15

    //audio button
    button.addEventListener('click',()=> {
        if(audio.paused === false)
            audio.pause()
        else
            audio.play()
    })


    //move pac-man
    function movePacman(e) {

        squares[pacmanCurrentIndex].classList.remove('pac-man')

        switch (e.keyCode) {
            case 37:
                if(pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex -1].classList.contains('wall') &&
                !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair'))
                    pacmanCurrentIndex -=1

                //check if pacman is in the left exit
                if((pacmanCurrentIndex -1) === 363) {
                    pacmanCurrentIndex = 391
                }

                break
            case 38:
                if(pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex -width].classList.contains('wall') &&
                !squares[pacmanCurrentIndex -width].classList.contains('ghost-lair'))
                    pacmanCurrentIndex -=width
                break
            case 39:
                if(pacmanCurrentIndex % width < width -1 && !squares[pacmanCurrentIndex +1].classList.contains('wall') &&
                !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair'))
                    pacmanCurrentIndex +=1

                //check if pacman is in the right exit
                if((pacmanCurrentIndex +1) === 392) {
                    pacmanCurrentIndex = 364
                }


                break
            case 40:
                if(pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
                    !squares[pacmanCurrentIndex +width].classList.contains('ghost-lair'))
                    pacmanCurrentIndex +=width
                break
        }

        squares[pacmanCurrentIndex].classList.add('pac-man')

        pacDotEaten()
        powerPelletEaten()
        checkForGameOver()
        checkForWin()

    }
    document.addEventListener('keyup',movePacman)

    //what happen if pac man eats a pac dot
    function pacDotEaten(){
        if (squares[pacmanCurrentIndex].classList.contains('pac-dot')){
            increaseScore(1)
            squares[pacmanCurrentIndex].classList.remove('pac-dot')

        }
    }
    // function to increase and update score display
    function increaseScore(points){
        score += points
        scoreDisplay.innerHTML = score
    }

    //what happen when you eat a power pellet
    function powerPelletEaten(){
        if(squares[pacmanCurrentIndex].classList.contains('power-pellet')){
            increaseScore(10)
            ghosts.forEach(ghost => ghost.isScared = true)
            setTimeout(unScaredGhosts, 10000)
            squares[pacmanCurrentIndex].classList.remove('power-pellet')
        }
    }

    //make the ghosts stop flashing
    function unScaredGhosts(){
        ghosts.forEach(ghost => ghost.isScared = false)
    }


    // ghost template - create
    class Ghost {
        constructor(className, startIndex, speed) {
            this.className = className
            this.startIndex = startIndex
            this.speed = speed
            this.currentIndex = startIndex
            this.timerId = NaN
            this.isScared = false
        }
    }

    const ghosts = [
        new Ghost('blinky',348,250),
        new Ghost('pinky', 376, 400),
        new Ghost('clyde', 379, 500),
        new Ghost('inky', 351, 300)
    ]

    //draw ghosts onto the grid
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.className)
        squares[ghost.currentIndex].classList.add('ghost')
    })

    //function to move ghosts
    function moveGhost(ghost){
        const directions = [-1, +1, width, -width]
        let direction = directions[Math.floor(Math.random()*directions.length)]

        ghost.timerId = setInterval(function () {
            //if the next square ghost is going to go in does NOT contain a wall and ghost, you can go there
            if (!squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost')) {
                //remove all ghost related classes
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
                //change the currentIndex to the new safe square
                ghost.currentIndex += direction
                //redraw ghost in new safe space
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
                //else find new direction to try
            } else direction = directions[Math.floor(Math.random()*directions.length)]

            // if ghost = scared then
            if(ghost.isScared) {
                squares[ghost.currentIndex].classList.add('scared-ghost')
            }

            //if the ghost is scared and pacman want to eat it.
            if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man'))
                {
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
                ghost.currentIndex = ghost.startIndex
                increaseScore(100)
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')

            }
            checkForGameOver()
        }, ghost.speed)
    }
    //move the ghosts randomly
    ghosts.forEach(ghost => moveGhost(ghost))

    //game over set
    function checkForGameOver() {
        if(squares[pacmanCurrentIndex].classList.contains('ghost') &&
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keyup', movePacman)
            setTimeout(function () {alert('You Died')
            }, 500)
           // scoreDisplay.innerHTML = 'YOU DIED'
        }
    }
    //check for win
    function checkForWin() {
        if(score >= 274) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keyup', movePacman)
            setTimeout(function () {alert('You Defeated')})
        }
    }







})