import { generateUID, isClass } from './Utils'
import { EventEmitter } from './EventEmitter'
import { RpgCommonPlayer, Direction } from './Player'
import { Control } from './Input'
import { RpgPlugin } from './Plugin'
import { GameWorker } from './Worker'

export default class Game extends EventEmitter {

    events: any
    world: any

    // client side only
    playerId: string
    standalone: boolean
    clientEngine: any
    renderer: any
    _playerClass: any

    constructor(private side: string) {
        super()
        this.events = {} // events for all player in map
    }

    get isWorker() {
        return this.side == 'worker'
    }

    start(world) {
        this.world = world
    }

    createWorkers(options: any) {
        return new GameWorker(options)
    }
    
    addObject(_class, playerId?: string) {
        let event
        if (!playerId) playerId = generateUID()
        if (isClass(_class)) {
            event = new _class(this, playerId)
        }
        else {
            event = _class
        }
        return event
    }

    addPlayer(playerClass, playerId?: string) {
        const player = this.addObject(playerClass, playerId)
        return player
    }

    addEvent(eventClass, eventId?: string) {
        const event = this.addObject(eventClass, eventId)
        return event
    }

    processInput(playerId: string): RpgCommonPlayer {
        const player: RpgCommonPlayer = this.world.getObject(playerId)

        if (!player) return player
        if (!player.canMove) return player

        const routesMove: any = []

        while (player.pendingMove.length > 0) {
            const inputData = player.pendingMove.shift()
            let { input, deltaTimeInt } = inputData as any
            let moving = false

            if (input == Control.Action) {
                player.triggerCollisionWith(RpgCommonPlayer.ACTIONS.ACTION)
            }
            else if (
                input == Direction.Left || 
                input == Direction.Right || 
                input == Direction.Up || 
                input == Direction.Down
            ) {
                moving = true
                const isMove = player.moveByDirection(+input, deltaTimeInt || 1)
                if (isMove) {
                    routesMove.push(inputData)
                }
            } 
            // TODO, is Worker
            if (this.side == 'server') RpgPlugin.emit('Server.onInput', [player, {
                ...inputData,
                moving
            }], true)

        }
        return player
    }
}
