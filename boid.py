# %%
import numpy as np
import pygame
# %%


class Boid():
    def __init__(self, id=None, max_x=None, max_y=None, color=[255,0,0]):
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
            -5, 5), np.random.randint(-5, 5)
        self.color =  color


    def make_coords(self):
        alpha = np.pi/2#self.get_alpha()
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
        if self.vel_y == 0:
            if self.vel_x > 0:
                return 0
            else:
                return np.pi
        elif self.vel_x == 0:
            if self.vel_y > 0:
                return np.pi/2
            else:
                return np.pi*3/2
        else:
            return np.arctan(self.vel_x/self.vel_y)

    def get_vel(self):
        return np.sqrt(np.mean(np.square(self.vel)))

    def draw(self, win):
        coords = self.make_coords()
        return pygame.draw.polygon(win, self.color, [tuple(coords[i, :]) for i in range(len(coords))])

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
        return np.array([self.x,self.y])
        

    # TODO: add more rules:
        # away from mouse, to mouse if clicked
        # perching

    def move_boid(self, coords, vels, win):
        vel = np.vstack([0.5*self.rule1(coords, factor=0.1),
                         2*self.rule2(coords, r_clear=50),
                         self.rule3(vels,  factor=8),
                        #  self.limit_pos(),
                         self.limit_vel(100)
                         ]).sum(0)
        self.vel = vel+np.array(self.vel)
        self.vel_x, self.vel_y = self.vel
        self.pos = self.endless_frame()
        self.x, self.y = self.vel + np.array(self.pos)
        self.pos = self.x, self.y
        # print(vel)
        return self.draw(win)

    def scatter(self):
        # TODO: maybe improve, so it is more fluid
        self.pos = self.x, self.y, = np.random.randint(
            2*self.radius, self.max_x), np.random.randint(2*self.radius, self.max_y)

# %%
