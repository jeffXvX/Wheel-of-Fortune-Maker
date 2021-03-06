# Wheel-of-Fortune-Maker
Create customized puzzles and categories for Wheel of Fortune (NES).
## Motivation
[Wheel of Fortune (NES)](http://nintendo.wikia.com/wiki/Wheel_of_Fortune_(NES)) was released in 1988 and many of the puzzles are unfamiliar to modern players. Wheel of Fortune Maker allows users to replace individual puzzles from the original game or even create an entirely new set of puzzles. One goal of the project is to allow users to create specialty puzzle sets. For example a user can make all of the puzzles about video games and gaming. Manually creating custom puzzle sets by editing the ROM directly or through a series of scripts proved to be cumbersome. Wheel of Fortune Maker automates the process of creating custom puzzles and allows individuals with no knowledge of computer programming to make their own puzzles.
## Development
This project is built with [Angular](https://angular.io/) using the [Angular CLI](https://github.com/angular/angular-cli).  For more information on how to use the Angular cli with this repo see the readme inside the `WoFCustomizer` app directory.
## Deploy
This app is hosted on the github page associated with the repo.  In order to deploy a new version run the deploy npm script with `npm run deploy` from the WoFCustomizer directory.  The deploy script will rebuild the app and copy the contents to the necessary locations for the repo.  Then commit and push back to the git repo and pull the changes to the master branch.  
The deploy script builds the Angular app and does a few other small tasks to prepare the repo to be picked up by the github pages.  The node script `./WoFCustomizer/node-scripts/modify-index-for-github.js` makes the changes necessary to the index.html file in order to properly host the app on the github page.  The `noJekyll` script turns off jekyll on the github repo so that the docs folder's index.html file is automatically served.
## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
## Additional information about Wheel of Fortune (NES)
For further information about how Wheel of Fortune (NES) works, please visit:
- [Wheel of Infinite Fortune](https://chrisbeaumont.org/infinite_wheel)
- [TASVideo's Game Resources page for Wheel of Fortune (NES)](http://tasvideos.org/GameResources/NES/WheelOfFortune.html)
- A [complete list of the game's original puzzles](http://tasvideos.org/GameResources/NES/WheelOfFortune/PuzzleList.html) is also available
Additionally, a new puzzle set created by jeffXvX which focuses on video games and gaming is available to [download as a patch](https://www.romhacking.net/hacks/4210/)
## Contribute
Contact tme321 if you are interested in contributing.
## Credits
Created by jeffXvX and tme321. Special thanks to nescardinality and LozCardsFan23.
## License
Wheel of Fortune Maker is released under the MIT license, which is a free software license.

Copyright © 2019 jeffXvX and tme321

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.