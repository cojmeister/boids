# %%
import numpy as np
import pygame
from pygame.locals import *
from boid import Boid
# %%


def redrawGameWindow(win,  arrray_of_boids, scatter=False):
    # win.blit(bg, (0, 0))
    win.fill((0, 0, 0))

    if not scatter:
        for boids in arrray_of_boids:
            coords = get_coords(boids)
            vels = get_vels(boids)
            for boid in boids:
                boid.move_boid(coords, vels, win)
    else:
        for boids in arrray_of_boids:
            coords = get_coords(boids)
            vels = get_vels(boids)
            for boid in boids:
                weights = np.ones(4) #!
                weights[0] = -1
                boid.move_boid(coords, vels, win, weights)


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
    boids1 = []
    for i in range(20):
        boids1.append(Boid(i, WIDTH, HEIGHT))
    boids2 = []
    for i in range(10):
        boids2.append(Boid(i, WIDTH, HEIGHT, [0, 255, 0]))
    boids3 = []
    for i in range(30):
        boids3.append(Boid(i, WIDTH, HEIGHT, [0, 0, 255]))
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
            redrawGameWindow(win,[boids1, boids2, boids3],scatter=True)
        elif keys[pygame.K_r]:
            for boids in [boids1, boids2, boids3]:
                for boid in boids:
                    boid.scatter()
        else:
            redrawGameWindow(win, [boids1, boids2, boids3])

        # elif keys[pygame.K_RIGHT] and boid.x < 500 - boid.radius*2 - boid.vel_x:
        #     boid.x += boid.vel_x


    pygame.quit()


# %%
if __name__ == "__main__":
    main()
# %%
