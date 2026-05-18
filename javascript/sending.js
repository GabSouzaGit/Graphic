function send(name, color, pts, bd, rs, ps){
    if(!evaluating) { 
        activeEvaluation.name = name;
        activeEvaluation.color = color;
        activeEvaluation.made = 1;

        activeEvaluation.evaluations.push({
            pts: Number(pts),
            bd: Number(bd),
            rs: Number(rs),
            ps: Number(ps),
        });

        evaluating = true;

        notifyInputFromEvaluating(evaluating);
        openEvaluationSession(activeEvaluation);
        prepareForNextEvaluation();

    }else if(evaluating){
        activeEvaluation.made++;
        saveParcialDataFromEvaluation(
            Number(pts), 
            Number(bd), 
            Number(rs), 
            Number(ps),
        );
    }

    updateEvaluationRemaining()

    if(activeEvaluation.made == activeEvaluation.evaluators){
        const evalAvgs = avgOfEvaluators();
        
        const avgs = getAvgByAxios(
            evalAvgs.pts,
            evalAvgs.bd,
            evalAvgs.rs,
            evalAvgs.ps
        );
    
        tableAppending(
            avgs, 
            activeEvaluation.name, 
            activeEvaluation.color, 
            evalAvgs.pts, 
            evalAvgs.bd, 
            evalAvgs.rs, 
            evalAvgs.ps,
        )
    
        plotPoint(
            (avgs.xavg / 10) * canvas.width, 
            canvas.height - ((avgs.yavg / 10) * canvas.height),
            activeEvaluation.color,
            true,
            5
        );
    
        saveOnLocalStorage(
            activeEvaluation.name, 
            activeEvaluation.color, 
            evalAvgs.pts, 
            evalAvgs.bd, 
            evalAvgs.rs, 
            evalAvgs.ps,
        );
    
        updateStatistics();
        endSessionLifeCycle();
        notifyInputFromEvaluating();
        updateEvaluationRemaining();

        return;
    }
}