from typing import Tuple

import pygame


class Boid():
    def __init__(self, boid_id: int, x: float, y: float,
                 color: Tuple[int, int, int] = (255, 0, 0)) -> None:
        self.boid_id = boid_id
        self.radius = 15

        self.pos = self.x, self.y, = x, y

        self.color = color

    def draw(self, window):
        return pygame.draw.circle(window, self.color, self.pos, self.radius)
