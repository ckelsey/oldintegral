import maybe from "./maybe";

const transformGet = source => transform => path => maybe(path)
    .maybe(
        undefined,
        value => transform(
            value
                .split(`.`)
                .reduce(
                    (newVal, key) => newVal[key.trim()],
                    typeof source === `function` ? source() : source
                )
        )
    )

export default transformGet