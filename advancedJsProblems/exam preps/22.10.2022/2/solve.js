class footballTeam {
    constructor(clubName, country, invitedPlayers) {
        this.clubName = clubName;
        this.country = country;
        this.invitedPlayers = [];
    }

    newAdditions(footballPlayers) {
        let invited = new Set();
        for (let invitedPlayer of footballPlayers) {
            let [name, age, playerValue] = invitedPlayer.split('/');
            age = +age;
            playerValue = +playerValue;

            const player = this.invitedPlayers.filter(p => p.name === name)[0]

            if (player) {
                if (player.playerValue < playerValue) {
                    player.playerValue = playerValue;
                }
            } else {
                this.invitedPlayers.push({ name, age, playerValue })
            }

            invited.add(name);
        }
        invited = Array.from(invited).join(', ');
        return `You successfully invite ${invited}.`
    }

    signContract(selectedPlayer) {
        let [name, playerOffer] = selectedPlayer.split('/');
        playerOffer = +playerOffer;

        let player = this.invitedPlayers.filter(p => p.name === name)[0];

        if (!player) {
            throw new Error(`${name} is not invited to the selection list!`)
        }
        const priceDifference = player.playerValue - playerOffer
        if (playerOffer < player.playerValue) {
            throw new Error(`The manager's offer is not enough to sign a contract with ${name}, ${priceDifference} million more are needed to sign the contract!`)
        }

        player.playerValue = 'Bought';

        return `Congratulations! You sign a contract with ${name} for ${playerOffer} million dollars.`
    }

    ageLimit(name, age) {
        let player = this.invitedPlayers.filter(p => p.name === name)[0];
        if (!player) {
            throw new Error(`${name} is not invited to the selection list!`);
        }

        if (player.age < age) {
            const ageDif = age - player.age;
            if (ageDif < 5) {
                return `${name} will sign a contract for ${ageDif} years with ${this.clubName} in ${this.country}!`
            }
            if (ageDif > 5) {
                return `${name} will sign a full 5 years contract for ${this.clubName} in ${this.country}!`
            }

        }
        return `${name} is above age limit!`
    }

    transferWindowResult() {
        let sortedPlayers = this.invitedPlayers.sort((a,b) => a.name.localeCompare(b.name));
        sortedPlayers = sortedPlayers.map(p => `Player ${p.name}-${p.playerValue}`).join('\n');
        return `Players list:\n${sortedPlayers}`
    }
}


let fTeam = new footballTeam("Barcelona", "Spain");
console.log(fTeam.newAdditions(["Kylian Mbappé/23/160", "Lionel Messi/35/50", "Pau Torres/25/52"]));
console.log(fTeam.signContract("Kylian Mbappé/240"));
console.log(fTeam.ageLimit("Kylian Mbappé", 30));
console.log(fTeam.transferWindowResult());



