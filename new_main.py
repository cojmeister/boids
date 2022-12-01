from typing import Final, Tuple

import numpy as np
import pygame as py
import pygame.mouse

from concurrent.futures import ProcessPoolExecutor, ThreadPoolExecutor

from new_rules import rule1, rule3, rule2, limit_vel, limit_positions, tend_to_place

FPS: Final[int] = 30
SCREEN_SIZE: Final[int] = 1000


def redraw_game_window(win, state_vector: np.ndarray):
    # win.blit(bg, (0, 0))
    win.fill((0, 0, 0))
    color: Tuple[int, int, int] = (255, 0, 0)
    radius: int = 5
    with ThreadPoolExecutor() as pool:
        for row in state_vector:
            pool.submit(py.draw.circle(win, color, (row[0], row[1]), radius))

    # for row in state_vector:
    #     py.draw.circle(win, color, (row[0], row[1]), radius)


def main():
    num_of_boids = 5
    positions = np.random.rand(num_of_boids, 2) * SCREEN_SIZE
    velocities = np.zeros((num_of_boids, 2))
    clock = py.time.Clock()
    py.init()

    win = py.display.set_mode((SCREEN_SIZE, SCREEN_SIZE))
    # TODO: variable screen size

    py.display.set_caption("First Game")
    # TODO: GUI with sliders

    # Mainloop
    run = True
    while run:
        clock.tick(FPS)
        for event in py.event.get():
            if event.type == py.QUIT:
                run = False

        weights = [1, 1, 1]

        velocities += weights[0] * rule1(positions, 1)
        velocities += weights[1] * rule2(positions, 30)
        velocities += weights[2] * rule3(positions, 1)
        velocities += weights[2] * tend_to_place(positions, pygame.mouse.get_pos())

        velocities = limit_vel(velocities, max_vel=25)

        positions = limit_positions(positions, velocities, SCREEN_SIZE)

        redraw_game_window(win, positions)
        py.display.update()
        # run = False
    py.quit()


if __name__ == "__main__":
    main()
