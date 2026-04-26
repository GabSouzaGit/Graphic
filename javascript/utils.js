function getAvgByAxios(pts, bd, rs, ps){
    return {
        xavg: (Number(pts) + Number(bd)) / 2,
        yavg: (Number(rs) + Number(ps)) / 2
    }
}