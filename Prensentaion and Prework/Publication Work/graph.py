import matplotlib.pyplot as plt

datasetCount=[100,200,300,400,500,600,700,800,900,1000,1100,1200]
#timeInMillisecondsOfTraditional=[125,150,200,275,320,370,450,550]
#timeInMillisecondsOfSimultanoeus=[145,150,210,245,275,315,375,420]

timeInMillisecondsOfTraditional=[114,	448,	48008,	64084,	88031,	111978,	135925,	159872,	183819,	207766,	231713,	255660]
timeInMillisecondsOfSimultanoeus=[407,	1273,	100783,	134530.3333,	184718.3333,	234906.3333,	285094.3333,	335282.3333,	385470.3333,	435658.3333,	485846.3333,	536034.3333]

plt.plot(datasetCount,timeInMillisecondsOfTraditional,label="Traditional Algorithm")
plt.plot(datasetCount,timeInMillisecondsOfSimultanoeus,label="Simultaneous Algorithm")

plt.xlabel("No of Transactions")
plt.ylabel("Time in milli seconds")

plt.title("Time Comparision")
plt.legend(["Traditional Algorithm","Simultaneous Algorithm"])

plt.show()
