# %%
import numpy as np


# %%


def rule1(coords: np.ndarray, factor: float = 1) -> np.ndarray:
    """
    Rule 1: Cohesion:
        Calculate the perceived center of mass of the flock and move towards it
    :param coords: The coordinates of the boids, in x and y as columns
    :param factor: The factor to multiply the deltas by
    :return: The deltas to move the boids in x and y
    """
    perceived_centers = (coords.sum(axis=0) - coords) / (coords.shape[0] - 1)

    return (perceived_centers - coords) * factor / 100


def rule2(coords: np.ndarray, r_clear: float = 3) -> np.ndarray:
    """
    Rule 2: Separation:
        Calculate the distance between each boid and the other boids and move away from them
    :param coords: The coordinates of the boids, in x and y as columns
    :param r_clear: The minimal distance to be kept between boids
    :return: The deltas to move the boids in x and y in order to move away from each other
    """
    deltas = np.zeros(coords.shape)
    for idx, boid in enumerate(coords):
        for idy, second_boid in enumerate(coords):
            if idx != idy:
                if np.linalg.norm(np.abs(boid-second_boid))<r_clear:
                    deltas[idx,:] += -(boid-second_boid)

    vec_length = coords.shape[0]
    # Take the x and y coordinates of the boids
    x_coords = coords[:, 0]
    y_coords = coords[:, 1]

    # Calculate the distance between each boid and the other boids
    x_matrix = x_coords - np.tile(x_coords, (vec_length, 1)).T
    y_matrix = y_coords - np.tile(y_coords, (vec_length, 1)).T

    # Calculation using Euclidean distance
    dist_matrix = np.sqrt(x_matrix ** 2 + y_matrix ** 2)

    # Remove distances that are larger than the clear distance.
    # Distance of boid to self is 0
    x_matrix[dist_matrix > r_clear] = 0
    y_matrix[dist_matrix > r_clear] = 0

    # Calculate how much each boid should move away from the other boids
    # And return as x and y deltas
    deltas2 = np.array([x_matrix.sum(axis=0), y_matrix.sum(axis=0)]).T
    print(deltas-deltas2)
    return deltas2


def rule3(velocities: np.ndarray, factor: float = 1) -> np.ndarray:
    """
    Rule 3: Match Velocities:
        Calculate the perceived velocities of the flock and tries to match it
    :param velocities: The velocities of the boids, in x and y as columns
    :param factor: The factor to multiply the deltas by
    :return: The deltas to move the boids in x and y
    """
    vec_length = velocities.shape[0]
    perceived_velocities = (velocities.sum(axis=0) - velocities) / (vec_length - 1)

    return (perceived_velocities - velocities) * factor / 8


def limit_vel(velocities: np.ndarray, max_vel: float = 15.0) -> np.ndarray:
    for i, vel in enumerate(velocities):
        abs_vel = (vel ** 2).sum() ** 0.5
        if abs_vel > max_vel:
            velocities[i] = vel / abs_vel

    return velocities


def limit_positions(positions: np.ndarray, velocities: np.ndarray, screen_size: int = 1000) -> np.ndarray:
    x_vals = np.where(screen_size < (positions[:, 0] + velocities[:, 0]), positions[:, 0] - velocities[:, 0],
                      positions[:, 0] + velocities[:, 0])
    x_vals = np.where((x_vals + velocities[:, 0]) < 0, x_vals - velocities[:, 0], x_vals + velocities[:, 0])

    y_vals = np.where(screen_size < (positions[:, 1] + velocities[:, 1]), positions[:, 1] - velocities[:, 1],
                      positions[:, 1] + velocities[:, 1])
    y_vals = np.where((y_vals + velocities[:, 1]) < 0, y_vals - velocities[:, 1], y_vals + velocities[:, 1])
    return np.array([x_vals, y_vals]).T


def tend_to_place(positions, mouse):
    mouse = np.array(mouse)
    return (mouse - positions) / 100
