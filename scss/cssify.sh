#!/bin/bash

CSSDIR=../css

if [ ! -d $CSSDIR ]
then
  mkdir $CSSDIR
fi

for FILE in `ls | egrep -v "cssify"`
do
  sass --style expanded $FILE $CSSDIR/${FILE%%\.scss}.css
done
