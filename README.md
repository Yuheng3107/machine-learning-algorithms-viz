# machine-learning-algorithms-viz

Project to Visualize Cool Machine Learning Algorithms in the Browser
Click [here](https://machine-learning-algorithms-viz.vercel.app/) to try it out!

Tech Stack: Vite (React + TypeScript) + Rechart for Charting + Vercel for deployments

Currently, only the K Means Clustering Algorithm is visualized.

### K Means Clustering
The K Means Clustering Algorithm is an Unsupervised Learning Algorithm, which tries to find patterns from unlabelled data.
It is able to find the centroids (centers) of n (you have to decide n) distinct clusters (groups of data), through the following steps:

Repeat until Centroids stop moving around:
1. Randomly Generate n Centroids
2. Assign Each Data Point to belong to the nearest Centroid
3. Compute the new positions of the Centroids by taking the average of all the points belonging to the centroid.
