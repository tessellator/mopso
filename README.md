# MOPSO
A sample Multi-Objective PSO implementation

## Introduction

This project provides a sample implementation of a multi-objective particle swarm optimization (MOPSO) algorithm.  It is built for a school project and so is not primed for real-world usage.

If you would like to see the algorithm in action, check it out [here](http://tessellator.github.io/mopso).

I began examining MOPSO for a school paper on grid task planning systems.  The slides from that presentation are [here](https://speakerdeck.com/tessellator/task-planning-on-the-grid). The slides might not make much sense without the accompanying talk, but if you are interested or have insomnia, please feel free to get in touch!

### Limitations

This particular implementation was designed around the idea of visualizing the algorithm.  As such, it assumes that the fitness functions are of the style 'f(x,y) = z', and that you will have only two of them in the MOPSO case.  This is to display the Pareto front in a manner that is relatively easy to explain.

## Contributing

If you spot a bug, please fork this project, fix the issue, and send me a pull request.  Extra points for topic branches.  I always welcome constructive feedback!

## License

This project is released under the [MIT License](http://opensource.org/licenses/MIT).
