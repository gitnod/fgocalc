
setwd("C:/GitRepo/fgocalc/data/summon/")

failuresArray = 0:2999
successArray = 1:5
probsArray = c(0.00333, 0.004, 0.005, 0.007, 0.0075, 0.012, 0.015, 0.028)

for(pp in probsArray) {
  for(N in successArray) {
    
    drawProbsArray = pnbinom(failuresArray, size = N, prob = pp)
    df = data.frame(failures=failuresArray, probs=drawProbsArray)
    filenameString = paste("prob",100*pp,"Success",N,".csv",sep = "")
    write.csv(within(df, probs <- format(floor(probs*1e+6)/1e+4),scientific=FALSE),
              file = filenameString, row.names = FALSE)
    
  }
}

