
setwd("C:/GitRepo/fgocalc/lib/multinom/")

minVar = 2
maxVar = 6
maxSuccess = 5

for(d in minVar:maxVar) {
  combinations = as.matrix(expand.grid(rep(list(0:maxSuccess), d)))
  colnames(combinations) = NULL
  write.csv(combinations, file = paste("multinomVectors_dim",d,".csv",sep=""), row.names = FALSE)
}

