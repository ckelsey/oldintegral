import pipe from "./pipe";

const partial = (func, args = []) => {

    const formatArgs = _args =>{
        const formattedArgs = []
        let index = 0

        while (index < _args.length) {
            formattedArgs.push(_args[index])
            index = index + 1
        }

        return formattedArgs
    }

    return {
        get args() {
            return formatArgs(args)
        },

        get func() {
            return func
        },

        get length() {
            return formatArgs(args).length
        },

        set(arg, index?) {
            let proxy

            if (index === undefined){
                proxy = formatArgs(args).concat(arg)
            }else{
                proxy = formatArgs(args).slice(0)
                proxy[index] = arg
            }

            return partial(func, proxy)
        },

        tap(fn){
            return partial(fn(pipe.apply(this, formatArgs(args))))
        },

        pipe(x?) {
            const result = pipe.apply(this, formatArgs(args))

            return (typeof result === `function`) ? result(x) : result
        },

        curry(x?){
            const proxy = formatArgs(args).slice(0)
            const len = proxy.length
            let index = 0
            let result

            while (index < len){
                const arg = proxy[index]

                result = result === undefined ? func(arg) : result(arg)

                if (typeof result !== `function`){
                    return result
                }

                index = index + 1
            }

            if (typeof result !== `function`) {
                return result
            }

            return result(x)
        }
    }
}

export default partial