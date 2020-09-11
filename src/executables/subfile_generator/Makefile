########################################################################
####################### Makefile Template ##############################
########################################################################

# Compiler settings - Can be customized.
CC = gcc
CXXFLAGS = -Wall -lm
LDFLAGS = 

# Makefile settings - Can be customized.
APPNAME = subfile_generator
EXT = .c
SRCDIR = ./src
LIBDIR = ./src/libs
OBJDIR = ./obj/

############## Do not change anything from here downwards! #############
SRC = $(wildcard $(SRCDIR)/*$(EXT))
OBJ = $(SRC:$(SRCDIR)/%.c=$(OBJDIR)/%.o)
DEP = $(OBJ:$(OBJDIR)/%.o=%.d)
# UNIX-based OS variables & settings
RM = rm
DELOBJ = $(OBJ)
# Windows OS variables & settings
DEL = del
EXE = .exe
WDELOBJ = $(SRC:$(SRCDIR)/%$(EXT)=$(OBJDIR)\\%.o)

########################################################################
####################### Targets beginning here #########################
########################################################################

all: signal_generator subfile_generator

signal_generator: $(OBJDIR)signal_generator.o
	$(CC) -o $@ $< $(OBJDIR)libs/frannor.o $(CXXFLAGS)

subfile_generator: $(OBJDIR)subfile_generator.o
	$(CC) -o $@ $< $(CXXFLAGS) -lconfini

$(OBJDIR)signal_generator.o: ./src/signal_generator.c ./src/signal_generator.h ./src/libs/frannor.c ./src/libs/frannor.h
	$(CC) -c -o $@ $< $(CXXFLAGS)

$(OBJDIR)subfile_generator.o: ./src/subfile_generator.c ./src/subfile_generator.h
	$(CC) -c -o $@ $< $(CXXFLAGS) -lconfini

$(OBJDIR)libs/frannor.o: ./src/libs/frannor.c ./src/libs/frannor.h
	$(CC) -c -o $@ $< $(CXXFLAGS)

clean:
	$(RM) $(wildcard ./obj/*.o ./obj/libs/*.o signal_generator subfile_generator)