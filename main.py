# %%
import numpy as np
import pygame
from pygame.locals import *
from boid import Boid
# %%


def redrawGameWindow(win,  arrray_of_boids):
    # win.blit(bg, (0, 0))
    win.fill((0, 0, 0))

    for boids in arrray_of_boids:
        coords = get_coords(boids)
        vels = get_vels(boids)
        for boid in boids:
            boid.move_boid(coords, vels, win)

    pygame.display.update()


def get_coords(boids):
    coords = np.empty([len(boids), 2])
    for i in range(len(boids)):
        coords[i] = np.array(boids[i].pos)

    return coords


def get_vels(boids):
    vels = np.empty([len(boids), 2])
    for i in range(len(boids)):
        vels[i] = np.array(boids[i].vel)

    return vels


# %%
def main():
    WIDTH, HEIGHT = 750, 750
    boids = []
    for i in range(20):
        boids.append(Boid(i, WIDTH, HEIGHT))
    boids2 = []
    for i in range(10):
        boids2.append(Boid(i, WIDTH, HEIGHT, [0, 255, 0]))
    boids3 = []
    for i in range(30):
        boids2.append(Boid(i, WIDTH, HEIGHT, [0, 0, 255]))
    # give them groups and colors

    clock = pygame.time.Clock()
    pygame.init()

    win = pygame.display.set_mode((WIDTH, HEIGHT))
    # TODO: variable screen size

    pygame.display.set_caption("First Game")
    # TODO: GUI with sliders

    # Mainloop
    run = True
    while run:
        clock.tick(60)

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False

        keys = pygame.key.get_pressed()

        if keys[pygame.K_SPACE]:
            for boid in boids:
                boid.scatter()
            for boid in boids2:
                boid.scatter()
            for boid in boids3:
                boid.scatter()

        # elif keys[pygame.K_RIGHT] and boid.x < 500 - boid.radius*2 - boid.vel_x:
        #     boid.x += boid.vel_x

        redrawGameWindow(win, [boids, boids2, boids3])

    pygame.quit()


# %%
if __name__ == "__main__":
    main()
# %%
