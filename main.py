# %%
import numpy as np
import pygame
from pygame.locals import *
from boid import Boid
# %%


def redrawGameWindow(win,  boids):
    # win.blit(bg, (0, 0))
    win.fill((0, 0, 0))
    
    coords = get_coords(boids)
    vels = get_vels(boids)

    for i in range(len(boids)):
        boids[i].move_boid(coords,vels, win)

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
    WIDTH, HEIGHT = 750,750
    boids = []
    for i in range(100):
        boids.append(Boid(i, WIDTH, HEIGHT))

    clock = pygame.time.Clock()
    pygame.init()

    win = pygame.display.set_mode((WIDTH, HEIGHT))

    pygame.display.set_caption("First Game")

    # Mainloop
    run = True
    while run:
        clock.tick(30)

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False

        keys = pygame.key.get_pressed()

        if keys[pygame.K_SPACE]:
            for boid in boids:
                boid.scatter()

        # elif keys[pygame.K_RIGHT] and boid.x < 500 - boid.radius*2 - boid.vel_x:
        #     boid.x += boid.vel_x


        redrawGameWindow(win,boids)

    pygame.quit()

# %%
if __name__ == "__main__":
    main()
# %%
