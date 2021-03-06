# %%
import numpy as np
import pygame
# %%


class Boid():
    def __init__(self, id=None, max_x=None, max_y=None, color=[255, 0, 0]):
        # TODO: add third dimension, radius is function of distance from camera?
        self.radius = 15
        if id is not None:
            self.id = id
        if max_x is None:
            self.max_x = 500-self.radius*2
        else:
            self.max_x = max_x-self.radius*2
        if max_y is None:
            self.max_y = 500-self.radius*2
        else:
            self.max_y = max_y-self.radius*2
        self.pos = self.x, self.y, = np.random.randint(
            2*self.radius, self.max_x), np.random.randint(2*self.radius, self.max_y)
        self.group = 0
        self.vel = self.vel_x, self.vel_y = np.random.randint(
            -2, 2), np.random.randint(-2, 2)
        self.color = color

    def make_coords(self):
        alpha = self.get_alpha()
        r = self.radius
        coords = np.array([[np.cos(alpha), np.sin(alpha)],
                           [np.cos(alpha+5*np.pi/6), np.sin(alpha+5*np.pi/6)],
                           [1/3*np.cos(alpha+np.pi), 1/3*np.sin(alpha+np.pi)],
                           [np.cos(alpha+7*np.pi/6), np.sin(alpha+7*np.pi/6)]])
        coords = r*(np.ones([4, 2])+coords)
        coords[:, 0] += self.x
        coords[:, 1] += self.y
        return coords

    def get_alpha(self):
        if pygame.mouse.get_pressed()[0]:
            x = self.x-pygame.mouse.get_pos()[0]
            y = self.y-pygame.mouse.get_pos()[1]
            return -np.pi/2+np.arctan2(x,y)
        # epsi = 0.05
        # if -epsi < self.vel_y < epsi:
        #     if self.vel_x > epsi:
        #         return 0
        #     else:
        #         return np.pi
        # elif -epsi<self.vel_x<epsi:
        #     if self.vel_y > epsi:
        #         return np.pi*3/2
        #     else:
        #         return np.pi/2
        # # elif self.vel_x<0 and self.vel_y<0:
        # #     return np.arctan2(self.vel_x,self.vel_y)
        return np.arctan2(self.vel_x,self.vel_y)

    def get_vel(self):
        return np.sqrt(np.mean(np.square(self.vel)))

    def draw(self, window):
        coords = self.make_coords()
        return pygame.draw.polygon(window, self.color, [tuple(coords[i, :]) for i in range(len(coords))])

    def rule1(self, coords, factor=1):
        # boids go to center of mass of neighbours
        N = len(coords)-1
        c = np.delete(coords, self.id, axis=0).sum(axis=0)
        c = c/N
        pos = np.array([self.x, self.y])
        return np.array((c-pos)*factor/100)

    def rule2(self, coords, r_clear=100):
        # boids keep their distance from each other
        coords = np.delete(coords, self.id, axis=0)
        pos = np.array([self.x, self.y])
        coords = coords[(self.calc_dist(coords) < r_clear)]

        return ((pos-coords).sum(0)/100)

    def calc_dist(self, coords):
        return np.sqrt(np.sum(np.square(coords-self.pos), axis=1))

    def rule3(self,  vels, factor=12.5):
        # Match the velocityof  each other
        vels = np.delete(vels, self.id, axis=0).sum(0)/len(vels)
        # vels = vels
        vel = np.array([self.vel_x, self.vel_y])
        vel = (vels-vel)
        return vel * factor/100

    def limit_vel(self, vlim=50):
        vel_x, vel_y = 0, 0
        if np.abs(self.vel_x) > vlim:
            vel_x = self.vel_x / np.abs(self.vel_x) * vlim
        if np.abs(self.vel_y) > vlim:
            vel_y = self.vel_y / np.abs(self.vel_y) * vlim
        return np.array([vel_x, vel_y])

    def tend_towards(self,  xy, factor=1):
        return (xy-self.pos) * factor/100

    def limit_pos(self):
        vel_x, vel_y = 0, 0
        if self.x < self.radius:
            vel_x = 10
        elif self.max_x < self.x:
            vel_x = -10
        if self.y < 2*self.radius:
            vel_y = 10
        elif self.max_y < self.y:
            vel_y = -10
        return np.array([vel_x, vel_y])

    def endless_frame(self):
        if self.x < self.radius:
            self.x = self.max_x
        elif self.max_x < self.x:
            self.x = self.radius
        if self.y < self.radius:
            self.y = self.max_y
        elif self.max_y < self.y:
            self.y = self.radius
        return np.array([self.x, self.y])

    # TODO: add more rules:
        # perching

    def move_boid(self, coords, vels, window, wind=None, mouse=None, weights=None):
        if wind is None:
            wind = np.zeros([1, 2])

        vel = np.vstack([self.rule1(coords, factor=1),
                         self.rule2(coords, r_clear=50),
                         self.rule3(vels,  factor=8),
                         wind,
                         self.tend_towards(mouse),
                         self.limit_vel(100),
                         self.limit_pos()
                         ])
        if weights is None:
            weights = np.ones(len(vel))
        vel = weights.dot(vel)
        self.vel = vel+np.array(self.vel)
        self.vel_x, self.vel_y = self.vel
        # self.pos = self.endless_frame()
        self.x, self.y = self.vel + np.array(self.pos)
        self.pos = self.x, self.y
        # print(vel)
        return self.draw(window)

    def scatter(self):
        # TODO: maybe improve, so it is more fluid
        self.pos = self.x, self.y, = np.random.randint(
            2*self.radius, self.max_x), np.random.randint(2*self.radius, self.max_y)
        self.vel = self.vel_x, self.vel_y = np.random.randint(
            -2, 2), np.random.randint(-2, 2)
