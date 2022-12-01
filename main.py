# %%
import numpy as np
import pygame as py

from boid import Boid

# %%


def redrawGameWindow(win,  arrray_of_boids, wind, scatter=False):
    # win.blit(bg, (0, 0))
    win.fill((0, 0, 0))
    weights = np.ones(7)  # !

    weights_dict = {'rule1': 0, 'rule2': 1, 'rule3': 2,
                    'wind': 3, 'mouse': 4, 'limit_vel': 5}

    weights[weights_dict['rule1']] = 0.35
    weights[weights_dict['wind']] = 0.1
    if py.mouse.get_pressed()[0]:
        weights[weights_dict['mouse']] = -0.05
    elif py.mouse.get_pressed()[-1]:
        weights[weights_dict['mouse']] = 0.2
    else:
        weights[weights_dict['mouse']] = 0

    mouse = np.array(py.mouse.get_pos())

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

    py.display.update()


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
    WIDTH, HEIGHT = 1080, 750
    boids1 = []
    for i in range(20):
        boids1.append(Boid(i, WIDTH, HEIGHT))
    boids2 = []
    for i in range(100):
        boids2.append(Boid(i, WIDTH, HEIGHT, [0, 255, 0]))
    boids3 = []
    for i in range(30):
        boids3.append(Boid(i, WIDTH, HEIGHT, [0, 0, 255]))

    clock = py.time.Clock()
    py.init()

    win = py.display.set_mode((WIDTH, HEIGHT))
    # TODO: variable screen size

    py.display.set_caption("First Game")
    # TODO: GUI with sliders

    wind = np.zeros([1, 2])
    # Mainloop
    run = True
    while run:
        clock.tick(30)

        for event in py.event.get():
            if event.type == py.QUIT:
                run = False

        # keys = py.key.get_pressed()
        #
        # if keys[py.K_LEFT]:
        #     if wind[0, 0] > -0.8:
        #         wind[0, 0] -= 0.5
        # elif keys[py.K_RIGHT]:
        #     if wind[0, 0] < 0.8:
        #         wind[0, 0] += 0.5
        #
        # if keys[py.K_UP]:
        #     if wind[0, 1] > -0.8:
        #         wind[0, 1] -= 0.5
        # elif keys[py.K_DOWN]:
        #     if wind[0, 1] < 0.8:
        #         wind[0, 1] += 0.5
        #
        # if keys[py.K_SPACE]:  # spread
        #     if keys[py.K_w]:
        #         wind = np.zeros([1, 2])
        #     redrawGameWindow(win, [boids1, boids2, boids3], wind, scatter=True)
        # elif keys[py.K_r]:  # reset
        #     wind = np.zeros([1, 2])
        #     for boids in [boids1, boids2, boids3]:
        #         for boid in boids:
        #             boid.scatter()
        # else:  # as normal
        #     redrawGameWindow(win, [boids1, boids2, boids3], wind)
    py.quit()


# %%
if __name__ == "__main__":
    main()
# %%
