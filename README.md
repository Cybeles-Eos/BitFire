# BitFire

A simple browser-based pixel battle game built with **HTML**, **CSS**, and **JavaScript**. Fight a wooden trunk enemy in a turn-based duel — tap attack, watch random skills fly, and try to win before your HP runs out.

## What is this?

BitFire is a small side-view fighting game where you and an enemy take turns attacking. Each attack uses a random skill (bullet, fireball, and more) with different damage. HP is shown as a bar and number, and damage pops up when a hit lands.

No install or build step — just open the game in your browser.

## How to play

1. Open `index.html` in your browser (double-click the file, or use a local server).
2. Click **click to start** on the title screen.
3. Tap the **sword attack button** to take your turn.
4. Your character shoots a random skill at the enemy. The enemy attacks back after you.
5. Reduce the enemy's HP to **0** to win. If your HP reaches **0**, you lose.
6. Click **Play again** on the win/lose popup to start a new round.

### Tips

- Wait for the attack button to become active again before your next turn.
- Win and lose counts are saved in your browser (local storage).
- Open **Settings** (gear icon) to reset your score or mute/unmute sound.

## Skills

| Skill       | Damage |
|------------|--------|
| Bullet     | 5      |
| FireBall   | 10     |
| GreenBall  | 15     |
| PurpleBall | 20     |

Each turn picks a random skill for you and for the enemy.

## Project structure

```
BitFire/
├── index.html      # Main game page
├── Js/app.js       # Game logic
├── Styles/         # CSS styles
├── Images/         # Sprites and UI assets
└── Audio/          # Music and sound effects
```

## Run locally

**Option 1 — Open directly**

Open `index.html` in Chrome, Firefox, Edge, or any modern browser.

**Option 2 — Local server (optional)**

```bash
# Python
python -m http.server 8000

# Then visit http://localhost:8000
```

## Tech stack

- HTML5
- CSS3 (animations, pixel-art layout)
- Vanilla JavaScript
- Browser localStorage for score saving

## License

Personal / educational project. Asset and audio credits belong to their respective owners.
