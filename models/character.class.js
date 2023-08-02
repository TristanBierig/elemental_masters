class Character extends MovableObject {
    spawnInterval;
    doubleJumpAvailable = true;
    isTransformed = false;
    isTransforming = false;
    isGameOver = false;
    isHitting = false;

    activeSpells = [];
    spellCooldownQ = false;
    spellCooldown = false;
    spellCooldown = false;

    walking_sound = playerSoundsRun;
    airborne_sound = playerSoundsFlying;
    punch_sound = playerSoundsPunch;
    gettingHurt_sound = playerSoundsHurt;
    transform_sound = playerSoundsTransform;
    gameOver_sound = playerSoundsGameOver;

    playRun = false;
    playAir = false;


    // Move Horizontal + plays running sound
    characterMove() {
        if (world && world.keyboard.RIGHT == true && !this.isTransforming) {
            this.moveRight();
            if (!this.playRun) {
                this.walking_sound.playpause();
                this.playRun = true;
            }
            this.movementStatus = 'RIGHT';
        }

        if (world && world.keyboard.LEFT == true && this.x > -550 && !this.isTransforming) {
            this.moveLeft();
            if (!this.playRun) {
                this.walking_sound.playpause();
                this.playRun = true;
            }
            this.movementStatus = 'LEFT';
        }

        // Mutes running sound when standing or jumping
        if (world && (!world.keyboard.LEFT && !world.keyboard.RIGHT) || this.isAirborne()) {
            if (this.playRun) {
                this.walking_sound.playpause();
                this.playRun = false;
            }
        }
    }


    characterJump() {
        // Jumps or doubleJump and plays flying sound
        if (world && world.keyboard.SPACE == true && (!this.isAirborne() || (this.y < 120 && this.doubleJumpAvailable)) && !this.isTransforming) {
            this.jump();

            // Disables double jump when already jumped a second time while in air
            if (this.isAirborne() && this.y < 200 && this.doubleJumpAvailable) {
                this.doubleJumpAvailable = false;
            }

            if (!this.playAir) {
                this.airborne_sound.playpause();
                this.playAir = true;
            }
        }

        // Mutes fly sound on the the ground
        if (!this.isAirborne() && this.playAir && this.speedY < 0) {
            this.airborne_sound.playpause();
            this.playAir = false;
            this.doubleJumpAvailable = true;
        }
    }


    characterAttackQ() {
        // Cast Q-Attack
        if (world && world.keyboard.Q == true && !this.spellCooldownQ && !this.isTransforming) {
            this.spellCooldownQ = true;

            // Expands hitbox to right synched with animation
            if (this.movementStatus == 'RIGHT' || this.movementStatus == undefined) {
                if (!this.isTransformed) {
                    setTimeout(() => {
                        this.offset = this.hitboxes.normalForm.qRight;
                    }, 200);
                } else {
                    // Handles Transformed punch hitbox
                    setTimeout(() => {
                        this.offset = this.hitboxes.evolvedForm.qRight;
                    }, 200);
                }
            }

            // Expands hitbox to left synched with animation
            if (this.movementStatus == 'LEFT') {
                if (!this.isTransformed) {
                    setTimeout(() => {
                        this.offset = this.hitboxes.normalForm.qLeft;

                    }, 200);
                } else {
                    // Handles Transformed punch hitbox
                    setTimeout(() => {
                        this.offset = this.hitboxes.evolvedForm.qLeft;

                    }, 200);
                }
            }

            // Shrinks hitbox sychned with animation
            if (!this.isTransformed) {
                setTimeout(() => {
                    this.spellCooldownQ = false;
                    this.offset = this.hitboxes.normalForm.idle;
                    this.isHitting = false;
                }, 500);
            } else {
                // Handles Transformed punch hitbox reset
                setTimeout(() => {
                    this.spellCooldownQ = false;
                    this.offset = this.hitboxes.evolvedForm.idle;
                    this.isHitting = false;
                }, 500);
            }
        }
    }


    characterAttackW(element) {
        // Cast W-Spell only when having mana and the cooldown is up
        if (world && world.keyboard.W == true && !this.spellCooldown && !this.isAirborne() && world.statusBar[1].percentage >= 10 && !this.isTransforming) {
            world.rockShatterAudio.play();
            if (!this.isTransformed) {
                this.activeSpells.push(new ThrowableObject(this.x + this.offset.left + this.width - this.offset.right,
                    this.y + this.offset.top,
                    this.movementStatus,
                    'W',
                    this.activeSpells.length, element));
            } else {
                this.activeSpells.push(new ThrowableObject(this.x + this.offset.left + this.width - this.offset.right,
                    this.y + this.offset.top + 52,
                    this.movementStatus,
                    'W',
                    this.activeSpells.length, element));
            }

            this.spellCooldown = true;
            world.statusBar[1].percentage -= 10;
            setTimeout(() => {
                this.spellCooldown = false;
            }, 1000);
        }
    }


    characterAttackE(element) {
        // Casts E-Spell only when having mana and the cooldown is up
        if (world && world.keyboard.E == true && !this.spellCooldown && world.statusBar[1].percentage >= 10 && !this.isTransforming) {
            this.activeSpells.push(new ThrowableObject(this.x + this.offset.left + this.width - this.offset.right,
                this.y + this.offset.top,
                this.movementStatus,
                'E',
                this.activeSpells.length, element));
            this.spellCooldown = true;
            world.statusBar[1].percentage -= 10;
            setTimeout(() => {
                this.spellCooldown = false;
            }, 1000);
        }
    }


    characterTransform() {
        // Evolves into ultimate Form
        if (world && world.keyboard.R == true && world.statusBar[2].percentage >= 100 && !this.isTransformed) {
            this.isTransforming = true;
            this.isTransformed = true;
        }
    }


    moveCamera() {
        world.camera_x = -this.x + 60; // 60 default
    }
}