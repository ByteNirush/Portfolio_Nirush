declare module 'animejs/lib/anime.es.js' {
    interface AnimeParams {
        targets?: string | Element | Element[] | NodeList | object | object[];
        [key: string]: unknown;
    }

    interface AnimeInstance {
        play(): void;
        pause(): void;
        restart(): void;
        reverse(): void;
        seek(time: number): void;
        began: boolean;
        paused: boolean;
        completed: boolean;
        finished: Promise<void>;
        currentTime: number;
        progress: number;
        duration: number;
        animations: unknown[];
    }

    interface AnimeStatic {
        (params: AnimeParams): AnimeInstance;
        stagger(value: number | string, options?: { start?: number; from?: string | number; direction?: string; easing?: string; grid?: number[]; axis?: string }): (el: Element, i: number) => number;
        timeline(params?: AnimeParams): AnimeTimelineInstance;
        remove(targets: string | Element | Element[] | NodeList): void;
        get(targets: string | Element | Element[] | NodeList, prop: string): string | number;
        set(targets: string | Element | Element[] | NodeList, params: object): void;
        random(min: number, max: number): number;
        speed: number;
        running: AnimeInstance[];
        suspendWhenDocumentHidden: boolean;
    }

    interface AnimeTimelineInstance extends AnimeInstance {
        add(params: AnimeParams, timeOffset?: string | number): AnimeTimelineInstance;
    }

    const anime: AnimeStatic;
    export default anime;
}
