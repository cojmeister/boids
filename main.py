# %%
import numpy as np
import pygame
from pygame.locals import *
from boid import Boid
# %%


def redrawGameWindow(win,  arrray_of_boids, wind, scatter=False):
    # win.blit(bg, (0, 0))
    win.fill((0, 0, 0))
    weights = np.ones(6)  # !

    weights_dict = {'rule1':0, 'rule2':1, 'rule3':2, 'wind':3, 'mouse':4,'limit_vel': 5}

    weights[weights_dict['wind']] = 0.1
    if pygame.mouse.get_pressed()[0]:
        weights[weights_dict['mouse']] = -0.05
    elif pygame.mouse.get_pressed()[-1]:
        weights[weights_dict['mouse']] = 0.2
    else:
        weights[weights_dict['mouse']] = 0

    mouse = np.array(pygame.mouse.get_pos())

    if not scatter:
        for boids in arrray_of_boids:
            coords = get_coords(boids)
            vels = get_vels(boids)
            for boid in boids:
                boid.move_boid(coords, vels, win, wind, mouse, weights)
    else:
        for boids in arrray_of_boids:
            coords = get_coords(boids)
            vels = get_vels(boids)
            for boid in boids:
                weights[weights_dict['rule1']] = -1
                boid.move_boid(coords, vels, win, wind, mouse, weights)

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
        wind = np.zeros([1, 2])

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False

        keys = pygame.key.get_pressed()

        if keys[pygame.K_LEFT]:
            if wind[0,0]>-0.8:
                wind[0,0] -= 0.5
        elif keys[pygame.K_RIGHT]:
            if wind[0,0]<0.8:
                wind[0,0] += 0.5

        if keys[pygame.K_UP]:
            if wind[0,1]>-0.8:
                wind[0,1] -= 0.5
        elif keys[pygame.K_DOWN]:
            if wind[0,1]<0.8:
                wind[0,1] += 0.5


        if keys[pygame.K_SPACE]:  # spread
            if keys[pygame.K_w]:
                wind = np.zeros([1, 2])
            redrawGameWindow(win, [boids1, boids2, boids3], wind, scatter=True)
        elif keys[pygame.K_r]:  # reset
            wind = np.zeros([1, 2])
            for boids in [boids1, boids2, boids3]:
                for boid in boids:
                    boid.scatter()
        else:  # as normal
            redrawGameWindow(win, [boids1, boids2, boids3], wind)

        # elif keys[pygame.K_RIGHT] and boid.x < 500 - boid.radius*2 - boid.vel_x:
        #     boid.x += boid.vel_x

    pygame.quit()


# %%
if __name__ == "__main__":
    main()
# %%
